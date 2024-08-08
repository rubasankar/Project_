import React from "react"

export interface Note{
    unid:string,
    title:string,
    content:string,
    colors:Tcolor,
    position:Pos,
}

export type NoteContextType = {
    notes:Note[],
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>
    selectedNote:Note,
    setSelectedNote:React.Dispatch<React.SetStateAction<Note>>,
    isAuthorized:string|null,
    setIsAuthorized:React.Dispatch<React.SetStateAction<string|null>>,
}

export interface Tcolor {
    id: string,
    colorHeader: string,
    colorBody: string,
    colorText: string,
}

export interface Pos{
    x:number,
    y:number
}