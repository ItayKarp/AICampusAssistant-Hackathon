import { MoreHorizontal } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type DropdownMenuProps = {
  items: Array<{
    label: string;
    onClick: () => void;
    danger?: boolean;
  }>;
};

export function DropdownMenu({ items }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!ref.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="dropdown-root" ref={ref}>
      <button
        type="button"
        className="icon-button"
        onClick={() => setIsOpen((value) => !value)}
      >
        <MoreHorizontal size={18} />
      </button>

      {isOpen ? (
        <div className="dropdown-menu">
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              className={item.danger ? "dropdown-item danger" : "dropdown-item"}
              onClick={() => {
                item.onClick();
                setIsOpen(false);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}