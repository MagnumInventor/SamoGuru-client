"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Clock, ChevronLeft, ChevronRight, RotateCw } from "lucide-react"

type Question = {
  id: number
  image: string
  question: string
  options: [string, string]
  correctAnswer: 0 | 1
  explanation: string
  backImage?: string
}

const quizData: Question[] = [
  {
    id: 1,
    image: "/public/images/test/trainee/dishes/serving-plate.jpg",
    question: "Сервірувальна тарілка (світла)",
    options: [
      "Кухня",
      "Станція офіціанта",
    ],
    correctAnswer: 1,
    explanation: "Сервірувальна тарілка використовується на станції офіціанта для сервірування столу гостям.",
    backImage: "/public/images/test/trainee/serving/default-serving.jpg"
  },
  {
    id: 2,
    image: "/public/images/test/trainee/dishes/serving-plate.jpg",
    question: "Сервірувальна тарілка (світла)",
    options: [
      "Кухня",
      "Станція офіціанта",
    ],
    correctAnswer: 1,
    explanation: "Сервірувальна тарілка використовується на станції офіціанта для сервірування столу гостям.",
    backImage: "/public/images/test/trainee/serving/default-serving.jpg"
  },
]