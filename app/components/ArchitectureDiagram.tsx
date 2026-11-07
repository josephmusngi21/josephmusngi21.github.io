type ArchNode = {
  id: string;
  label: string;
  layer: string;
  detail: string;
};

type ArchEdge = {
  from: string;
  to: string;
  label: string;
};

export type Architecture = {
  summary: string;
  nodes: ArchNode[];
  edges: ArchEdge[];
};

const LAYER_ORDER = ["client", "hardware", "server", "external", "data"];

const LAYER_STYLE: Record<string, { fill: string; stroke: string; title: string }> = {
  client: { fill: "#e0f2fe", stroke: "#0284c7", title: "Client" },
  hardware: { fill: "#fef3c7", stroke: "#d97706", title: "Hardware" },
  server: { fill: "#ede9fe", stroke: "#7c3aed", title: "Server" },
  external: { fill: "#fce7f3", stroke: "#db2777", title: "External services" },
  data: { fill: "#dcfce7", stroke: "#16a34a", title: "Data" },
};

const NODE_W = 160;
const NODE_H = 60;
const GAP_X = 28;
const GAP_Y = 80;
const MAX_COLS = 4;
const PAD = 24;
const LABEL_W = 96;
const LANE_GAP = 24;

function wrap(text: string, max: number) {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    if ((line + " " + word).trim().length > max && line) {
      lines.push(line);
      line = word;
    } else {
      line = (line + " " + word).trim();
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, 3);
}

export default function ArchitectureDiagram({ title, architecture }: { title: string; architecture: Architecture }) {
  const layers = LAYER_ORDER.filter((layer) => architecture.nodes.some((node) => node.layer === layer));
  const rowDefs = layers.flatMap((layer) => {
    const nodes = architecture.nodes.filter((node) => node.layer === layer);
    const chunks: ArchNode[][] = [];
    for (let i = 0; i < nodes.length; i += MAX_COLS) chunks.push(nodes.slice(i, i + MAX_COLS));
    return chunks.map((chunk, i) => ({ layer, nodes: chunk, first: i === 0 }));
  });
  const rows = rowDefs.map((row) => row.nodes);
  const maxCols = Math.max(...rows.map((row) => row.length), 1);
  const gridW = maxCols * NODE_W + (maxCols - 1) * GAP_X;
  const rowOf = new Map<string, number>();
  rows.forEach((row, rowIndex) => row.forEach((node) => rowOf.set(node.id, rowIndex)));
  const laneCount = architecture.edges.filter((edge) => {
    const ra = rowOf.get(edge.from);
    const rb = rowOf.get(edge.to);
    return ra !== undefined && rb !== undefined && Math.abs(ra - rb) > 1;
  }).length;
  const contentRight = PAD + LABEL_W + gridW;
  const width = contentRight + PAD + (laneCount ? laneCount * LANE_GAP + 90 : 0);
  const height = PAD * 2 + rows.length * NODE_H + (rows.length - 1) * GAP_Y;

  const position = new Map<string, { x: number; y: number; row: number }>();
  rows.forEach((row, rowIndex) => {
    const rowWidth = row.length * NODE_W + (row.length - 1) * GAP_X;
    const startX = PAD + LABEL_W + (maxCols * NODE_W + (maxCols - 1) * GAP_X - rowWidth) / 2;
    row.forEach((node, col) => {
      position.set(node.id, {
        x: startX + col * (NODE_W + GAP_X),
        y: PAD + rowIndex * (NODE_H + GAP_Y),
        row: rowIndex,
      });
    });
  });

  type Side = "top" | "bottom";
  const resolved = architecture.edges.flatMap((edge, index) => {
    const a = position.get(edge.from);
    const b = position.get(edge.to);
    if (!a || !b) return [];
    const srcSide: Side = a.row < b.row ? "bottom" : "top";
    const dstSide: Side = a.row > b.row ? "bottom" : "top";
    return [{ edge, index, a, b, srcSide, dstSide }];
  });

  const ports = new Map<string, number[]>();
  const addPort = (id: string, side: Side, index: number) => {
    const key = `${id}:${side}`;
    ports.set(key, [...(ports.get(key) ?? []), index]);
  };
  resolved.forEach((r) => {
    addPort(r.edge.from, r.srcSide, r.index);
    addPort(r.edge.to, r.dstSide, r.index);
  });
  const portX = (id: string, side: Side, index: number) => {
    const p = position.get(id)!;
    const list = ports.get(`${id}:${side}`) ?? [index];
    return p.x + ((list.indexOf(index) + 1) / (list.length + 1)) * NODE_W;
  };

  const laneOf = new Map<number, number>();
  resolved.forEach((r) => {
    if (Math.abs(r.a.row - r.b.row) > 1) laneOf.set(r.index, laneOf.size);
  });
  const edges = resolved.map(({ edge, index, a, b, srcSide, dstSide }) => {
    const x1 = portX(edge.from, srcSide, index);
    const x2 = portX(edge.to, dstSide, index);
    const y1 = srcSide === "bottom" ? a.y + NODE_H : a.y;
    const y2 = dstSide === "bottom" ? b.y + NODE_H : b.y;
    let path: string;
    let lx: number;
    let ly: number;

    if (a.row === b.row) {
      const top = a.y - 36;
      path = `M ${x1} ${y1} C ${x1} ${top}, ${x2} ${top}, ${x2} ${y2}`;
      lx = (x1 + x2) / 2;
      ly = top + 8;
    } else if (Math.abs(a.row - b.row) > 1) {
      const laneX = contentRight + 16 + (laneOf.get(index) ?? 0) * LANE_GAP;
      const dir = srcSide === "bottom" ? 1 : -1;
      const ys = y1 + dir * 14;
      const ye = y2 - dir * 14;
      path = `M ${x1} ${y1} V ${ys} H ${laneX} V ${ye} H ${x2} V ${y2}`;
      lx = laneX;
      ly = (ys + ye) / 2;
    } else {
      const mid = (y1 + y2) / 2;
      path = `M ${x1} ${y1} C ${x1} ${mid}, ${x2} ${mid}, ${x2} ${y2}`;
      lx = (x1 + x2) / 2;
      ly = mid;
    }

    return { key: `${edge.from}-${edge.to}-${index}`, path, lx, ly, label: edge.label };
  });

  return (
    <div className="rounded-3xl border border-stone-200 bg-white/90 p-6 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.16)]">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-stone-500">{title}</p>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">{architecture.summary}</p>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-stone-200 bg-stone-50/60">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label={`${title} diagram`}
          className="mx-auto block h-auto w-full"
          style={{ maxWidth: width, minWidth: Math.min(width, 760) }}
        >
          <defs>
            <marker id="arch-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
            </marker>
          </defs>

          {rowDefs.map((row, rowIndex) =>
            row.first ? (
              <text
                key={`${row.layer}-${rowIndex}`}
                x={PAD}
                y={PAD + rowIndex * (NODE_H + GAP_Y) + NODE_H / 2 + 4}
                fontSize="12"
                fontWeight="600"
                fill="#78716c"
              >
                {LAYER_STYLE[row.layer]?.title ?? row.layer}
              </text>
            ) : null,
          )}

          {edges.map((edge) => (
            <path key={edge.key} d={edge.path} fill="none" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arch-arrow)" />
          ))}

          {architecture.nodes.map((node) => {
            const p = position.get(node.id);
            if (!p) return null;
            const style = LAYER_STYLE[node.layer] ?? LAYER_STYLE.client;
            const lines = wrap(node.label, 24);
            return (
              <g key={node.id}>
                <rect x={p.x} y={p.y} width={NODE_W} height={NODE_H} rx="14" fill={style.fill} stroke={style.stroke} strokeWidth="1.5" />
                {lines.map((line, i) => (
                  <text
                    key={i}
                    x={p.x + NODE_W / 2}
                    y={p.y + NODE_H / 2 + (i - (lines.length - 1) / 2) * 15 + 4}
                    textAnchor="middle"
                    fontSize="12.5"
                    fontWeight="600"
                    fill="#0f172a"
                  >
                    {line}
                  </text>
                ))}
              </g>
            );
          })}

          {edges.map((edge) => {
            const text = edge.label.length > 34 ? `${edge.label.slice(0, 33)}...` : edge.label;
            const w = text.length * 5.6 + 10;
            return (
              <g key={`${edge.key}-label`}>
                <title>{edge.label}</title>
                <rect x={edge.lx - w / 2} y={edge.ly - 9} width={w} height="17" rx="8" fill="#ffffff" stroke="#e7e5e4" />
                <text x={edge.lx} y={edge.ly + 3} textAnchor="middle" fontSize="10" fill="#475569">
                  {text}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <dl className="mt-6 grid gap-3 md:grid-cols-2">
        {architecture.nodes.map((node) => {
          const style = LAYER_STYLE[node.layer] ?? LAYER_STYLE.client;
          return (
            <div key={node.id} className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3">
              <dt className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: style.stroke }} />
                {node.label}
              </dt>
              <dd className="mt-1 text-xs leading-6 text-slate-600">{node.detail}</dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}
