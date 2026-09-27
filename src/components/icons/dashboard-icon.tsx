import { Icon } from "../ui/icon";

export function DashboardIcon(props: React.ComponentProps<typeof Icon>) {
  return (
    <Icon viewBox="0 0 24 24" fill="none" {...props}>
      <rect
        x="2"
        y="2"
        width="9"
        height="11"
        rx="2"
        stroke="stroke-current"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="13"
        y="2"
        width="9"
        height="7"
        rx="2"
        stroke="stroke-current"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="2"
        y="15"
        width="9"
        height="7"
        rx="2"
        stroke="stroke-current"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="13"
        y="11"
        width="9"
        height="11"
        rx="2"
        stroke="stroke-current"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}
