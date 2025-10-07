import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { Container } from '@/redux/services/container/containerApi';
import { Info } from 'lucide-react';
import React from 'react';

interface ContainerMetadataCardProps {
  container: Container;
}

export function ContainerMetadataCard({ container }: ContainerMetadataCardProps) {
  return (
    <Card className="w-full rounded-lg shadow-md border border-gray-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Info className="h-5 w-5" /> Container Metadata
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Status */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground font-medium">Status</span>
            <Badge variant={container.status === 'running' ? 'default' : 'secondary'}>
              {container.status}
            </Badge>
          </div>

          {/* Created */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground font-medium">Created</span>
            <span className="text-sm">
              {formatDistanceToNow(new Date(container.created), { addSuffix: true })}
            </span>
          </div>

          {/* Container ID */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground font-medium">Container ID</span>
            <span className="text-sm font-mono truncate">{container.id}</span>
          </div>

          {/* Image */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground font-medium">Image</span>
            <span className="text-sm font-mono truncate">{container.image}</span>
          </div>

          {/* Command */}
          <div className="flex justify-between items-center col-span-1 sm:col-span-2">
            <span className="text-sm text-muted-foreground font-medium">Command</span>
            <span className="text-sm font-mono truncate">{container.command}</span>
          </div>

          {/* Ports */}
          {container?.ports?.length > 0 && (
            <div className="col-span-1 sm:col-span-2">
              <span className="text-sm text-muted-foreground font-medium">Ports</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {container.ports.map((port, index) => (
                  <Badge key={`${port.private_port}-${port.public_port}-${index}`} variant="outline">
                    {port.public_port} → {port.private_port} ({port.type})
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Mounts */}
          {container?.mounts?.length > 0 && (
            <div className="col-span-1 sm:col-span-2">
              <span className="text-sm text-muted-foreground font-medium">Mounts</span>
              <ul className="list-disc ml-4 mt-1 text-sm font-mono">
                {container.mounts.map((mount,idx) => (
                  <li key={idx}>{mount.source} → {mount.destination}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
