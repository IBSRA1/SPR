import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Participation } from "../types/performance"
import { ProgressBar } from "./progress-bar"
import { Users, Calendar } from "lucide-react"

interface ParticipationProps {
  data: Participation
}

export function ParticipationCard({ data }: ParticipationProps) {
  return (
    <Card className="border-[#152c44]/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-[#152c44]">
          <Users className="h-5 w-5" />
          Class Engagement
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Attendance & Participation */}
        <div>
          <h4 className="font-semibold mb-3 flex items-center gap-2 text-[#152c44]">
            <Calendar className="h-4 w-4" />
            Attendance & Participation
          </h4>
          <div className="space-y-3">
            <div>
              <span className="text-sm text-slate-600 mb-1 block">Class Attendance</span>
              <ProgressBar value={data.classAttendance} />
            </div>
            <div>
              <span className="text-sm text-slate-600 mb-1 block">Discussion Participation</span>
              <ProgressBar value={data.discussionParticipation} />
            </div>
            <div>
              <span className="text-sm text-slate-600 mb-1 block">Group Work</span>
              <ProgressBar value={data.groupWork} />
            </div>
            <div>
              <span className="text-sm text-slate-600 mb-1 block">Overall Engagement</span>
              <ProgressBar value={data.overallEngagement} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
