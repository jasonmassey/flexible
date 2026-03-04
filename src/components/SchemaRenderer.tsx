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
