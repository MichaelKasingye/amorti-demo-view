
import { Badge } from "@/components/ui/badge";
import { Deal, stageLabels, stageBadgeStyles } from "@/types/deals";

interface StageBadgeProps {
  stage: Deal['stage'];
}

export const StageBadge = ({ stage }: StageBadgeProps) => (
  <Badge variant="outline" className={stageBadgeStyles[stage]}>
    {stageLabels[stage]}
  </Badge>
);
