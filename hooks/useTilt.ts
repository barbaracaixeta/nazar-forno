"use client";

import { useCallback, useRef } from "react";

const MAX_TILT = 4.5; // graus — suficiente para dar volume, nunca "show"

/**
 * Inclinação 3D controlada pelo cursor, escrita direto em custom properties
 * (nenhum re-render). Nunca captura o ponteiro, nunca impede o scroll no
 * mobile e não roda sem `hover: hover`.
 *
 * Um único par de listeners por elemento; o valor é limited por clamp para
 * que o cartão não "persiga" o cursor.
 */
export function useTilt() {
  const ref = useRef<HTMLDivElement | null>(null);
  const frame = useRef<number | null>(null);
  const pending = useRef({ x: 0, y: 0, active: false });

  const flush = useCallback(() => {
    const node = ref.current;
    frame.current = null;
    if (!node) return;

    const { x, y, active } = pending.current;
    node.style.setProperty("--tilt-x", `${(-y * MAX_TILT).toFixed(2)}deg`);
    node.style.setProperty("--tilt-y", `${(x * MAX_TILT).toFixed(2)}deg`);
    node.style.setProperty("--tilt-active", active ? "1" : "0");
  }, []);

  const schedule = useCallback(() => {
    if (frame.current === null) frame.current = requestAnimationFrame(flush);
  }, [flush]);

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (event.pointerType !== "mouse") return;
      const rect = event.currentTarget.getBoundingClientRect();
      pending.current = {
        x: Math.max(-0.5, Math.min(0.5, (event.clientX - rect.left) / rect.width - 0.5)),
        y: Math.max(-0.5, Math.min(0.5, (event.clientY - rect.top) / rect.height - 0.5)),
        active: true,
      };
      schedule();
    },
    [schedule],
  );

  const onPointerLeave = useCallback(() => {
    pending.current = { x: 0, y: 0, active: false };
    schedule();
  }, [schedule]);

  return {
    ref,
    handlers: { onPointerMove, onPointerLeave },
  } as const;
}