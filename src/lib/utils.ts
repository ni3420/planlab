import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function genRateInvite(length:number){
  const char="ABCDEFGHIGKLMNPQRSabcdefghijklmonpqrs"
  let result=""
  for(let i=0;i<length;i++)
  {
    const random=char.charAt(Math.floor(Math.random()*char.length))
    result+=random
  }
  return result

}