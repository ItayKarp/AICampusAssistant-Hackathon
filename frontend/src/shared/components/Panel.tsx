import { cn } from "@/shared/utils/helpers";

type PanelProps = {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

export function Panel({
  title,
  subtitle,
  action,
  className,
  children,
}: PanelProps) {
  return (
    <section className={cn("glass-panel", className)}>
      {(title || subtitle || action) && (
        <div className="panel-header">
          <div>
            {title ? <h2 className="panel-title">{title}</h2> : null}
            {subtitle ? <p className="panel-subtitle">{subtitle}</p> : null}
          </div>
          {action ? <div>{action}</div> : null}
        </div>
      )}
      {children}
    </section>
  );
}