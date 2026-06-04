import Link from "next/link";

import type { PresentedHistoryRow } from "@/features/student-area/server/history-presenter";
import { buttonVariants } from "@/ui/components/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/components/table";

export function LearningPathHistoryTable({ rows }: { rows: PresentedHistoryRow[] }) {
  return (
    <Table aria-label="Saved learning paths">
      <TableHeader>
        <TableRow>
          <TableHead>Saved</TableHead>
          <TableHead>Tracks</TableHead>
          <TableHead>Progress</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.historyId}>
            <TableCell>{row.savedLabel}</TableCell>
            <TableCell>{row.trackSummary}</TableCell>
            <TableCell>{row.progressLabel}</TableCell>
            <TableCell>
              <span className="status-label">{row.statusLabel}</span>
            </TableCell>
            <TableCell>
              {row.resumeTarget && row.editTarget ? (
                <div className="history-row-actions">
                  <Link className={buttonVariants({ size: "sm" })} href={row.resumeTarget}>
                    Resume Learning
                  </Link>
                  <Link
                    className={buttonVariants({ size: "sm", variant: "secondary" })}
                    href={row.editTarget}
                  >
                    Edit Path
                  </Link>
                </div>
              ) : (
                <span className="status-label">No actions needed</span>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
