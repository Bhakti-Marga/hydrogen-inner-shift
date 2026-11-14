import {Section, type SectionPadding} from '~/ui';

type MosaicPhoto = {src: string; alt: string; width: number; height: number};

export type MissionHeroSectionProps = {
  fire: MosaicPhoto;
  mug: MosaicPhoto;
  flask: MosaicPhoto;
  runners: MosaicPhoto;
  stepOut: {title: string; text: string};
  terrain: string;
  mirror: string;
  padding?: SectionPadding;
  className?: string;
};

/**
 * Mission hero: a few photographs, each seen through several rounded windows
 * so the picture continues across the gaps, with text tiles in place of some
 * windows.
 *
 * Window positions are fractions of the Figma mosaic (1440 frame, tiles from
 * x 40.86). A shared image is sized to its Figma frame and clipped per tile,
 * so neighbouring tiles stay aligned at any width.
 */
export function MissionHeroSection({
  fire,
  mug,
  flask,
  runners,
  stepOut,
  terrain,
  mirror,
  padding = 'none',
  className,
}: MissionHeroSectionProps) {
  return (
    <Section
      padding={padding}
      tone="white"
      className={`px-4 pt-2 pb-10 md:px-8 md:pb-16 lg:px-10${className ? ` ${className}` : ''}`}
    >
      <Mosaic
        className="md:hidden"
        metrics={MOBILE}
        copy={{fire, mug, flask, runners, stepOut, terrain, mirror}}
        cells={mobileCells({fire, mug, flask, runners, stepOut, terrain, mirror})}
      />
      <Mosaic
        className="mission-desktop"
        metrics={DESKTOP}
        copy={{fire, mug, flask, runners, stepOut, terrain, mirror}}
        cells={desktopCells({fire, mug, flask, runners, stepOut, terrain, mirror})}
      />
    </Section>
  );
}

/** Design-pixel mosaic: 6 columns, three row heights, gaps of about 6px and 4px. */
const DESKTOP = metricsFrom(
  6,
  [176.86024475, 229.21661377, 142.96713257],
  6.31829834,
  4.29750824,
  1377.97296143,
);

/** Same photographs, retiled so the lines stay readable below 768px. */
const MOBILE = metricsFrom(2, [140, 180, 170, 130, 130], 6, 6, 360);

const GRID_W = 1377.97296143;
const GRID_H = 557.63900757;

type Frame = {
  src: string;
  width: number;
  height: number;
  alt: string;
  /** Box as fractions of the mosaic. May sit outside 0–1. */
  x: number;
  y: number;
  w: number;
  h: number;
  /** Crop inside the frame. Omit to centre the photograph. */
  position?: string;
};

type Metrics = ReturnType<typeof metricsFrom>;

type Copy = Pick<
  MissionHeroSectionProps,
  'fire' | 'mug' | 'flask' | 'runners' | 'stepOut' | 'terrain' | 'mirror'
>;

function desktopCells(copy: Copy): Cell[] {
  const fire = photoFrame(copy.fire, -100.93664551, -2.453125, 395.75317383, 593.62976074);
  const mug = photoFrame(copy.mug, 230.71960449, -164.63867188, 685.83184814, 1028.74780273);
  const flask = photoFrame(copy.flask, 1071.7175293, 0, 411.3052063, 616.95782471);
  const flaskLower = photoFrame(copy.flask, 916.54968262, -43.5546875, 574.13861084, 717.67333984);
  const runners = photoFrame(
    copy.runners,
    915.27233887,
    -34.16601563,
    238.31608582,
    357.47415161,
    '70.7% 50%',
  );

  return [
    photo(0, 0, fire, true),
    photo(1, 0, mug, true),
    photo(2, 0, mug),
    photo(3, 0, mug),
    photo(4, 0, runners, true),
    photo(5, 0, flask, true),
    photo(0, 1, fire),
    step(1, 1),
    photo(2, 1, mug),
    photo(3, 1, mug),
    note(4, 1, 'terrain'),
    photo(5, 1, flask),
    photo(0, 2, fire),
    photo(1, 2, mug),
    photo(2, 2, mug),
    photo(3, 2, mug),
    photo(4, 2, flaskLower),
    note(5, 2, 'mirror'),
  ];
}

function mobileCells(copy: Copy): Cell[] {
  const fire = {
    ...spanFrame(MOBILE, 0, 0, 1, 3),
    ...copy.fire,
    position: 'center 46%',
  };
  const mug = {
    ...spanFrame(MOBILE, 1, 1, 1, 2),
    ...copy.mug,
    position: 'center 42%',
  };
  const flask = {
    ...spanFrame(MOBILE, 0, 3, 1, 2),
    ...copy.flask,
    position: 'center 36%',
  };
  const runners = {
    ...spanFrame(MOBILE, 1, 0, 1, 1),
    ...copy.runners,
    position: '64% 42%',
  };

  return [
    photo(0, 0, fire, true),
    photo(1, 0, runners, true),
    step(0, 1),
    photo(1, 1, mug, true),
    photo(0, 2, fire),
    photo(1, 2, mug),
    photo(0, 3, flask, true),
    note(1, 3, 'terrain'),
    photo(0, 4, flask),
    note(1, 4, 'mirror'),
  ];
}

type Cell =
  | {kind: 'photo'; col: number; row: number; frame: Frame; priority?: boolean}
  | {kind: 'step'; col: number; row: number}
  | {kind: 'note'; col: number; row: number; note: 'terrain' | 'mirror'};

function Mosaic({
  metrics,
  cells,
  className,
  copy,
}: {
  metrics: Metrics;
  cells: Cell[];
  className?: string;
  copy: Copy;
}) {
  return (
    <div className={`w-full${className ? ` ${className}` : ''}`} style={{containerType: 'inline-size'}}>
      <div
        className="grid w-full"
        style={{
          // Height from the mosaic's width. `container-type: size` then lets
          // each window position its photograph against this box; aspect-ratio
          // alone collapses under that containment.
          height: `calc(100cqi / ${metrics.aspect})`,
          containerType: 'size',
          gridTemplateColumns: `repeat(${metrics.cols}, minmax(0, 1fr))`,
          gridTemplateRows: metrics.rows.map((row) => `${row}fr`).join(' '),
          columnGap: `${metrics.gapX * 100}cqi`,
          rowGap: `${(metrics.gapY / metrics.aspect) * 100}cqi`,
        }}
      >
        {cells.map((cell) => (
          <Tile key={`${cell.col}-${cell.row}`} cell={cell} metrics={metrics} copy={copy} />
        ))}
      </div>
    </div>
  );
}

function Tile({cell, metrics, copy}: {cell: Cell; metrics: Metrics; copy: Copy}) {
  const place = {
    gridColumn: cell.col + 1,
    gridRow: cell.row + 1,
  };

  if (cell.kind === 'photo') {
    const box = origin(metrics, cell.col, cell.row);
    const {frame} = cell;
    return (
      <div className="relative min-h-0 overflow-hidden rounded-card" style={place}>
        <img
          src={frame.src}
          alt={frame.alt}
          width={frame.width}
          height={frame.height}
          fetchPriority={cell.priority ? 'high' : undefined}
          className="absolute max-w-none object-cover"
          style={{
            width: `calc(${frame.w} * 100cqw)`,
            height: `calc(${frame.h} * 100cqh)`,
            left: `calc(${frame.x - box.x} * 100cqw)`,
            top: `calc(${frame.y - box.y} * 100cqh)`,
            objectPosition: frame.position ?? 'center',
          }}
        />
      </div>
    );
  }

  if (cell.kind === 'step') {
    return (
      <div
        className="flex min-h-0 flex-col items-center justify-center gap-2.5 overflow-hidden rounded-card bg-white px-3 text-center text-pine motion-safe:animate-rise-in md:px-4 lg:px-5"
        style={place}
      >
        <p className="text-mosaic font-semibold lg:text-mosaic-lg">{copy.stepOut.title}</p>
        <p className="max-w-34 text-body font-light">{copy.stepOut.text}</p>
      </div>
    );
  }

  return (
    <div
      className={`flex min-h-0 items-center overflow-hidden rounded-card bg-cobalt px-3 text-white motion-safe:animate-rise-in md:px-4 lg:px-7${
        cell.note === 'mirror' ? ' motion-safe:[animation-delay:var(--duration-slow)]' : ''
      }`}
      style={place}
    >
      <p className="text-mosaic lg:text-mosaic-lg">
        {cell.note === 'terrain' ? copy.terrain : copy.mirror}
      </p>
    </div>
  );
}

function photo(col: number, row: number, frame: Frame, priority = false): Cell {
  return {
    kind: 'photo',
    col,
    row,
    priority,
    frame: priority ? frame : {...frame, alt: ''},
  };
}

function step(col: number, row: number): Cell {
  return {kind: 'step', col, row};
}

function note(col: number, row: number, name: 'terrain' | 'mirror'): Cell {
  return {kind: 'note', col, row, note: name};
}

/** Frame box from pixels relative to the desktop mosaic's top-left. */
function photoFrame(
  image: MosaicPhoto,
  x: number,
  y: number,
  w: number,
  h: number,
  position?: string,
): Frame {
  return {
    ...image,
    x: x / GRID_W,
    y: y / GRID_H,
    w: w / GRID_W,
    h: h / GRID_H,
    position,
  };
}

function metricsFrom(
  cols: number,
  rows: number[],
  gapXPx: number,
  gapYPx: number,
  widthPx: number,
) {
  const heightPx = rows.reduce((sum, row) => sum + row, 0) + (rows.length - 1) * gapYPx;
  return {
    cols,
    rows,
    gapX: gapXPx / widthPx,
    gapY: gapYPx / heightPx,
    aspect: widthPx / heightPx,
  };
}

function rowFractions(metrics: Metrics) {
  const sum = metrics.rows.reduce((total, row) => total + row, 0);
  const free = 1 - (metrics.rows.length - 1) * metrics.gapY;
  return metrics.rows.map((row) => (row / sum) * free);
}

function origin(metrics: Metrics, col: number, row: number) {
  const colW = (1 - (metrics.cols - 1) * metrics.gapX) / metrics.cols;
  const rows = rowFractions(metrics);
  let y = 0;
  for (let i = 0; i < row; i++) y += rows[i] + metrics.gapY;
  return {x: col * (colW + metrics.gapX), y, colW, rowH: rows[row]};
}

/** One frame covering a run of tiles, gaps included, so the picture lines up. */
function spanFrame(metrics: Metrics, col: number, row: number, colSpan: number, rowSpan: number) {
  const start = origin(metrics, col, row);
  const end = origin(metrics, col + colSpan - 1, row + rowSpan - 1);
  return {
    x: start.x,
    y: start.y,
    w: end.x + end.colW - start.x,
    h: end.y + end.rowH - start.y,
  };
}
