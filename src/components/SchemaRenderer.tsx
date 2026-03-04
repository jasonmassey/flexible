import { ComponentNode } from "@/lib/schema";
import {
  Container,
  Section,
  Heading,
  Text,
  Button,
  Card,
  Hero,
  Nav,
  Footer,
  Grid,
  ImageComponent,
  LinkComponent,
  TableComponent,
  BadgeComponent,
  AvatarComponent,
  ProgressComponent,
  SeparatorComponent,
  AccordionComponent,
  TabsComponent,
  DialogComponent,
  AlertComponent,
  InputComponent,
  TextareaComponent,
  SelectComponent,
  CheckboxComponent,
  SwitchComponent,
  SliderComponent,
  ToggleComponent,
  CalendarComponent,
} from "./schema-components";

const componentMap: Record<
  string,
  React.ComponentType<{ node: ComponentNode }>
> = {
  container: Container,
  section: Section,
  heading: Heading,
  text: Text,
  button: Button,
  card: Card,
  hero: Hero,
  nav: Nav,
  footer: Footer,
  grid: Grid,
  image: ImageComponent,
  link: LinkComponent,
  table: TableComponent,
  badge: BadgeComponent,
  avatar: AvatarComponent,
  progress: ProgressComponent,
  separator: SeparatorComponent,
  accordion: AccordionComponent,
  tabs: TabsComponent,
  dialog: DialogComponent,
  alert: AlertComponent,
  input: InputComponent,
  textarea: TextareaComponent,
  select: SelectComponent,
  checkbox: CheckboxComponent,
  switch: SwitchComponent,
  slider: SliderComponent,
  toggle: ToggleComponent,
  calendar: CalendarComponent,
};

export function SchemaRenderer({ node }: { node: ComponentNode }) {
  const Component = componentMap[node.type];

  if (!Component) {
    console.warn(`Unknown component type: ${node.type}`);
    return (
      <div style={node.styles}>
        {node.children?.map((child) => (
          <SchemaRenderer key={child.id} node={child} />
        ))}
      </div>
    );
  }

  return <Component node={node} />;
}
