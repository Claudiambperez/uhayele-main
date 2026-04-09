"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Card } from "./card";

type Tab = {
  title: string;
  value: string;
  content?: string | React.ReactNode | any;
};

export const Tabs = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
}: {
  tabs: Tab[];
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
  contentClassName?: string;
}) => {
  const [active, setActive] = useState<Tab>(propTabs[0]);
  const [tabs, setTabs] = useState<Tab[]>(propTabs);

  const moveSelectedTabToTop = (idx: number) => {
    const newTabs = [...propTabs];
    const selectedTab = newTabs.splice(idx, 1);
    newTabs.unshift(selectedTab[0]);
    setTabs(newTabs);
    setActive(newTabs[0]);
  };

  const [hovering, setHovering] = useState(false);

  return (
    <Card className="border border-gray-200 shadow-sm w-full">
      {/* Tab Buttons */}
      <div className="px-6 pt-2 ">
        <div
          className={cn(
            "flex flex-row items-center justify-start [perspective:1000px] relative overflow-auto sm:overflow-visible no-visible-scrollbar max-w-full w-full",
            containerClassName
          )}
        >
          {propTabs.map((tab, idx) => (
            <button
              key={tab.title}
              onClick={() => moveSelectedTabToTop(idx)}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
              className={cn("relative px-6 py-3 rounded-full whitespace-nowrap", tabClassName)}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {active.value === tab.value && (
                <motion.div
                  layoutId="clickedbutton"
                  transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                  className={cn(
                    "absolute inset-0 bg-violet-100 rounded-full",
                    activeTabClassName
                  )}
                />
              )}

              <span className="relative block text-sm font-medium text-gray-700">
                {tab.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Content Area - Full height and width support */}
      <div className={cn("p-6 h-[100px] min-h-[400px] w-full", contentClassName)}>
        <FadeInDiv
          tabs={tabs}
          active={active}
          key={active.value}
          hovering={hovering}
        />
      </div>
    </Card>
  );
};

export const FadeInDiv = ({
  className,
  tabs,
  active,
  hovering,
}: {
  className?: string;
  tabs: Tab[];
  active: Tab;
  hovering?: boolean;
}) => {
  return (
    <div className="relative w-full min-h-[400px]">
      {tabs.map((tab) => (
        <div
          key={tab.value}
          className={cn(
            "w-full absolute top-0 left-0 transition-opacity duration-200",
            tab.value === active.value ? "opacity-100 block" : "opacity-30 hidden",
            className
          )}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
};
