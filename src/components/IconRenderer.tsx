// IconRenderer.tsx
import * as Icons from 'lucide-react';
import { LucideProps } from 'lucide-react';

type IconComponentType = React.ComponentType<LucideProps>;

interface IconRendererProps {
  iconName: string;
  size?: number;
}

const IconRenderer: React.FC<IconRendererProps> = ({ iconName, size = 30 }) => {
  const formattedIconName = iconName
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join('') as keyof typeof Icons;

  const IconComponent = Icons[formattedIconName] as IconComponentType;

  if (!IconComponent) {
    return <Icons.AlertCircle size={size} />;
  }

  return (
    <div
      style={{
        position: 'relative',
        width: `${size}px`,
        height: `${size}px`,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        filter: 'drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.5))',
      }}
    >
      <IconComponent
        size={size}
        style={{
          stroke: 'rgba(0, 0, 0, 0.6)', 
          strokeWidth: '1.5px',
          fill: 'transparent',
        }}
      />
    </div>
  );
};

export default IconRenderer;
