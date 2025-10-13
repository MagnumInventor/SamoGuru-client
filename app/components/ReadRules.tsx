"use client";

import { useState } from "react";
import Link from "next/link";

export function ReadRules() {
  const [UserAgreedToRules, setUserAgreedToRules] = useState(false);

  return (
    <div className="flex items-center justify-between px-4 pb-2">
      <label className="flex items-center">
        <input
          type="checkbox"
          checked={UserAgreedToRules}
          onChange={(e) => setUserAgreedToRules(e.target.checked)}
          className="w-4 h-4 text-orange-600 bg-white/10 border-white/20 rounded focus:ring-orange-500 focus:ring-2"
        />
        <span className="ml-2 text-sm text-white/80">Я прочитав і <b>погоджуюсь</b> з <Link href="/pnp">умовами використання та політикою конфіденційності</Link> платформи <b>СамоГуру</b></span>
      </label>
    </div>
  );
}

