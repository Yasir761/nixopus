import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Info } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Container } from '@/redux/services/container/containerApi';
import { useTranslation } from '@/hooks/use-translation';

interface ContainerMetadataCardProps {
  container: Container;
}

export function ContainerMetadataCard({ container }: ContainerMetadataCardProps) {
  const { t } = useTranslation();

  return (
    <Card className="w-full rounded-lg shadow-md border border-gray-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Info className="h-5 w-5" />
          {t('containers.metadata.title')}
        </CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Container ID */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground font-medium">
            {t('containers.metadata.id')}
          </span>
          <span className="text-sm font-mono truncate">{container.id}</span>
        </div>

        {/* Image */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground font-medium">
            {t('containers.metadata.image')}
          </span>
          <span className="text-sm font-mono truncate">{container.image}</span>
        </div>

        {/* Mounts */}
        {container?.mounts?.length > 0 && (
          <div className="col-span-1 sm:col-span-2">
            <span className="text-sm text-muted-foreground font-medium">
              {t('containers.metadata.mounts')}
            </span>
            <ul className="list-disc ml-4 mt-1 text-sm font-mono">
              {container.mounts.map((mount, idx) => (
                <li key={idx}>
                  {mount.source} → {mount.destination}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Labels */}
        {Object.keys(container.labels ?? {}).length > 0 && (
          <div className="col-span-1 sm:col-span-2">
            <span className="text-sm text-muted-foreground font-medium">
              {t('containers.metadata.labels')}
            </span>
            <div className="flex flex-wrap gap-2 mt-1">
              {Object.entries(container.labels).map(([key, value]) => (
                <Badge key={key} variant="outline">
                  {key}: {value}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
