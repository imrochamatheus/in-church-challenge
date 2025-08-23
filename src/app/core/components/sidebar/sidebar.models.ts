import { LucideIconData } from 'lucide-angular';

export interface MenuItem {
  icon: LucideIconData;
  label: string;
  active?: boolean;
}
