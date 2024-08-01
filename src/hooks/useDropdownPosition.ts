import { useEffect, useState, useRef } from "react";

export type DropdownPosition = {
  top: number;
  left: number;
};

export const useDropdownPosition = (isOpen: boolean) => {
  const [dropdownPosition, setDropdownPosition] = useState<DropdownPosition>({
    top: 0,
    left: 0,
  });
  const dropdownRef = useRef<HTMLDivElement>(null);

  const updateDropdownPosition = () => {
    if (dropdownRef.current) {
      const inputRect = dropdownRef.current.parentElement?.getBoundingClientRect();
      if (inputRect) {
        setDropdownPosition({
          top: inputRect.bottom + window.scrollY,
          left: inputRect.left + window.scrollX,
        });
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      updateDropdownPosition();
    }
  }, [isOpen]);

  useEffect(() => {
    updateDropdownPosition();
    window.addEventListener("scroll", updateDropdownPosition);
    window.addEventListener("resize", updateDropdownPosition);

    return () => {
      window.removeEventListener("scroll", updateDropdownPosition);
      window.removeEventListener("resize", updateDropdownPosition);
    };
  }, []);

  return { dropdownPosition, dropdownRef };
};
