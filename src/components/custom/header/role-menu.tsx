"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/components/lib/utils";
import { Roles } from "@/lib/constants";
import { useRoleStore } from "@/lib/store";

function StyledSelectItem({
  currentRole,
  value,
  children,
}: {
  currentRole: keyof typeof Roles;
  value: keyof typeof Roles;
  children: React.ReactNode;
}) {
  return (
    <SelectItem
      value={value}
      className={cn(
        "focus:bg-muted-primary",
        currentRole === value ? "text-focused font-bold" : ""
      )}
    >
      {children}
    </SelectItem>
  );
}

function HeaderRoleMenu(): React.JSX.Element {
  const { role, setRole } = useRoleStore();

  return (
    <Select value={role} onValueChange={setRole}>
      <SelectTrigger className="bg-background text-focused w-36 font-bold">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="w-36">
        {Object.entries(Roles).map(([key, value]) => (
          <StyledSelectItem
            key={key}
            currentRole={role}
            value={key as keyof typeof Roles}
          >
            {value}
          </StyledSelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default HeaderRoleMenu;
