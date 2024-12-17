import { cn } from "@/lib/utils";
import { Children, ReactElement } from "react";
import { ButtonProps } from "./button";

interface iAppProps{
    className?: string;
    children: ReactElement<ButtonProps>[];

}


export function ButtonGroup({ className, children }: iAppProps) {
    const totalButtons = Children.count(children)
    return(
        <div className={cn("flex w-full", className)}>
            {children.map((child, index) => {
                const isFirstItem = index === 0;
                const isLastItem = index === totalButtons - 1;
            })}
        </div>
    )
}