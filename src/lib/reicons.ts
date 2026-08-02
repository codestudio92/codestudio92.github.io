import { ArrowRight } from 'reicon/icons/ArrowRight';
import { ArrowsRotate } from 'reicon/icons/ArrowsRotate';
import { CheckCircle } from 'reicon/icons/CheckCircle';
import { Code } from 'reicon/icons/Code';
import { CodeSquare } from 'reicon/icons/CodeSquare';
import { Crosshairs } from 'reicon/icons/Crosshairs';
import { Cpu } from 'reicon/icons/Cpu';
import { Envelope } from 'reicon/icons/Envelope';
import { Gauge } from 'reicon/icons/Gauge';
import { Lightbulb } from 'reicon/icons/Lightbulb';
import { Menu } from 'reicon/icons/Menu';
import { Mobile } from 'reicon/icons/Mobile';
import { Monitor } from 'reicon/icons/Monitor';
import { Moon } from 'reicon/icons/Moon';
import { Pointer } from 'reicon/icons/Pointer';
import { Rocket } from 'reicon/icons/Rocket';
import { RulerPen } from 'reicon/icons/RulerPen';
import { ShieldCheck } from 'reicon/icons/ShieldCheck';
import { Sledgehammer } from 'reicon/icons/Sledgehammer';
import { Sun } from 'reicon/icons/Sun';
import { TestTube } from 'reicon/icons/TestTube';
import { Text } from 'reicon/icons/Text';
import { Xmark } from 'reicon/icons/Xmark';

type IconFn = {
  toSvg: (options?: {
    size?: number;
    color?: string;
    weight?: 'Outline' | 'Filled';
    className?: string;
  }) => string;
};

export const reicons = {
  'arrow-right': ArrowRight,
  'arrows-rotate': ArrowsRotate,
  'check-circle': CheckCircle,
  code: Code,
  'code-square': CodeSquare,
  crosshairs: Crosshairs,
  cpu: Cpu,
  envelope: Envelope,
  gauge: Gauge,
  lightbulb: Lightbulb,
  menu: Menu,
  mobile: Mobile,
  monitor: Monitor,
  moon: Moon,
  pointer: Pointer,
  rocket: Rocket,
  'ruler-pen': RulerPen,
  'shield-check': ShieldCheck,
  sledgehammer: Sledgehammer,
  sun: Sun,
  'test-tube': TestTube,
  text: Text,
  xmark: Xmark,
} as const satisfies Record<string, IconFn>;

export type ReiconName = keyof typeof reicons;

export function renderReicon(
  name: ReiconName,
  options: {
    size?: number;
    color?: string;
    weight?: 'Outline' | 'Filled';
    className?: string;
  } = {},
): string {
  const {
    size = 20,
    color = 'currentColor',
    weight = 'Outline',
    className = 'reicon',
  } = options;

  return reicons[name].toSvg({ size, color, weight, className });
}
