
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type UserRoleSelectorProps = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

export function UserRoleSelector({ value, onChange, disabled = false }: UserRoleSelectorProps) {
  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger id="role">
        <SelectValue placeholder="Pilih peran" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="admin">Admin</SelectItem>
        <SelectItem value="staff">Staff</SelectItem>
        <SelectItem value="customer">Customer</SelectItem>
      </SelectContent>
    </Select>
  );
}
