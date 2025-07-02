import { getDatabase } from "@/lib/mongodb"
import type { User, Fine, WorkShift, InternshipProgress } from "@/lib/models/user"
import { ObjectId } from "mongodb"

export class UserService {
  static async getUserById(userId: string): Promise<User | null> {
    const db = await getDatabase()
    const user = await db.collection("users").findOne({ _id: new ObjectId(userId) })
    return user as User | null
  }

  static async updateUser(userId: string, updates: Partial<User>): Promise<boolean> {
    const db = await getDatabase()
    const result = await db
      .collection("users")
      .updateOne({ _id: new ObjectId(userId) }, { $set: { ...updates, updatedAt: new Date() } })
    return result.modifiedCount > 0
  }

  static async getUserFines(userId: string): Promise<Fine[]> {
    const db = await getDatabase()
    const fines = await db.collection("fines").find({ userId }).sort({ date: -1 }).toArray()
    return fines.map((fine: any) => ({
      _id: fine._id,
      userId: fine.userId,
      date: fine.date,
      amount: fine.amount,
      comment: fine.comment,
      isPaid: fine.isPaid,
      createdAt: fine.createdAt,
    })) as Fine[]
  }

  static async addFine(fine: Omit<Fine, "_id" | "createdAt">): Promise<string> {
    const db = await getDatabase()
    const result = await db.collection("fines").insertOne({
      ...fine,
      createdAt: new Date(),
    })
    return result.insertedId.toString()
  }

  static async updateFinePaymentStatus(fineId: string, isPaid: boolean): Promise<boolean> {
    const db = await getDatabase()
    const result = await db.collection("fines").updateOne({ _id: new ObjectId(fineId) }, { $set: { isPaid } })
    return result.modifiedCount > 0
  }

  static async getUserWorkShifts(userId: string, month?: number, year?: number): Promise<WorkShift[]> {
    const db = await getDatabase()
    const query: any = { userId }

    if (month && year) {
      const startDate = new Date(year, month - 1, 1)
      const endDate = new Date(year, month, 0)
      query.date = { $gte: startDate, $lte: endDate }
    }

    const shifts = await db.collection("workShifts").find(query).sort({ date: -1 }).toArray()
    return shifts.map((shift: any) => ({
      _id: shift._id,
      userId: shift.userId,
      date: shift.date,
      startTime: shift.startTime,
      endTime: shift.endTime,
      isCompleted: shift.isCompleted,
      tips: shift.tips,
      salesPercentage: shift.salesPercentage,
      totalSales: shift.totalSales,
      createdAt: shift.createdAt,
    })) as WorkShift[]
  }

  static async addWorkShift(shift: Omit<WorkShift, "_id" | "createdAt">): Promise<string> {
    const db = await getDatabase()
    const result = await db.collection("workShifts").insertOne({
      ...shift,
      createdAt: new Date(),
    })
    return result.insertedId.toString()
  }

  static async updateWorkShift(shiftId: string, updates: Partial<WorkShift>): Promise<boolean> {
    const db = await getDatabase()
    const result = await db.collection("workShifts").updateOne({ _id: new ObjectId(shiftId) }, { $set: updates })
    return result.modifiedCount > 0
  }

  static async getInternshipProgress(userId: string): Promise<InternshipProgress | null> {
    const db = await getDatabase()
    const progress = await db.collection("internshipProgress").findOne({ userId })
    return progress as InternshipProgress | null
  }

  static async updateInternshipProgress(userId: string, updates: Partial<InternshipProgress>): Promise<boolean> {
    const db = await getDatabase()
    const result = await db
      .collection("internshipProgress")
      .updateOne({ userId }, { $set: { ...updates, updatedAt: new Date() } }, { upsert: true })
    return result.modifiedCount > 0 || result.upsertedCount > 0
  }

  static async calculateSalary(
    userId: string,
    month: number,
    year: number,
  ): Promise<{
    baseSalary: number
    tips: number
    salesBonus: number
    fines: number
    totalSalary: number
    workDays: number
  }> {
    const user = await this.getUserById(userId)
    if (!user) throw new Error("User not found")

    const shifts = await this.getUserWorkShifts(userId, month, year)
    const fines = await this.getUserFines(userId)

    const workDays = shifts.filter((shift) => shift.isCompleted).length
    const baseSalary = workDays * user.dailySalaryRate

    const tips = shifts.reduce((sum, shift) => sum + (shift.tips || 0), 0)
    const salesBonus = shifts.reduce((sum, shift) => {
      if (shift.salesPercentage && shift.totalSales) {
        return sum + (shift.totalSales * shift.salesPercentage) / 100
      }
      return sum
    }, 0)

    const monthFines = fines
      .filter((fine) => {
        const fineDate = new Date(fine.date)
        return fineDate.getMonth() === month - 1 && fineDate.getFullYear() === year
      })
      .reduce((sum, fine) => sum + fine.amount, 0)

    const totalSalary = baseSalary + tips + salesBonus - monthFines

    return {
      baseSalary,
      tips,
      salesBonus,
      fines: monthFines,
      totalSalary,
      workDays,
    }
  }
}
