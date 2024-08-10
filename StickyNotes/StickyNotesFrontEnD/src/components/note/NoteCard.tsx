import { useRef, useEffect, useState, MutableRefObject, createRef, useContext, } from "react";
import { Note, NoteContextType } from "../../types/@types.note";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import DeleteButton from "./DeleteButton";
import { NoteContext } from "../../context/NotesProvider";
import Spinner from "../../icons/Spinner";
import { saveData } from "../../utils/utils";


interface props {
    note: Note
}

const NoteCard = ({ note }: props) => {
    const { setSelectedNote} = useContext(NoteContext) as NoteContextType
    const body = JSON.stringify(note.content);
    const colors = note.colors;
    const [position, setPosition] = useState(note.position);
    const [saving, setSaving] = useState<boolean>(false);

    const cardRef = createRef<HTMLDivElement>();
    const keyUpTimer = useRef(0);
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
    // console.log('note.position', note.position)
    useEffect(() => {
        autoGrow(textAreaRef);
        setZIndex(cardRef.current)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const autoGrow = (textAreaRef: MutableRefObject<HTMLTextAreaElement | null>) => {
        const { current } = textAreaRef;
        if (current) {
            current.style.height = "auto";
            current.style.height = current.scrollHeight + "px";
        }
    }
    const handlestop = (_e: DraggableEvent, data: DraggableData) => {
        const pos = { x: data.x, y: data.y }
        setPosition(pos);
        saveData(note.unid,"position", pos);
    }

    const setZIndex = (selectedCard: HTMLDivElement | null) => {
        if (selectedCard) {
            setSelectedNote(note);
            selectedCard.style.zIndex = "999";

            Array.from(document.getElementsByClassName("card") as HTMLCollectionOf<HTMLElement>).forEach((card) => {
                if (card !== selectedCard) {
                    card.style.zIndex = String(parseInt(selectedCard.style.zIndex) - 1);
                }
            });
        }
    };

    const handlesave = async () => {
        setSaving(true);

        //2 - If we have a timer id, clear it so we can add another two seconds
        if (keyUpTimer) {
            if (keyUpTimer.current) {
                clearTimeout(keyUpTimer.current);
            }

            //3 - Set timer to trigger save in 2 seconds
            keyUpTimer.current = setTimeout(() => {
                console.log('saving', saving)
                saveData(note.unid,"content", textAreaRef.current?textAreaRef.current.value:"");
                setSaving(false);
            }, 2000);
        }
    }

  


    return (
        <Draggable handle="strong" nodeRef={cardRef} bounds="body" position={position} onStart={() => { setZIndex(cardRef.current) }} onStop={handlestop}>
            <div
                ref={cardRef}
                className="card"
                style={{
                    backgroundColor: colors.colorBody,
                    // left: `${position.x}px`,
                    // top: `${position.y}px`,
                }}
            >
                <strong className="cursor">
                    <div
                        className="card-header"
                        style={{ backgroundColor: colors.colorHeader }}
                    >
                        <DeleteButton noteId={note.unid} />
                        {
                            saving && (
                                <div className="card-saving">
                                    <Spinner color={colors.colorText} />
                                    <span style={{ color: colors.colorText }}>Saving...</span>
                                </div>
                            )
                        }
                    </div>
                </strong>
                <div className="card-body">
                    <textarea
                        ref={textAreaRef}
                        style={{ color: colors.colorText }}
                        defaultValue={body}
                        onFocus={() => { setZIndex(cardRef.current) }}
                        onInput={() => (
                            autoGrow(textAreaRef)
                        )}
                        onKeyUp={handlesave}
                    ></textarea>
                </div>
            </div>
        </Draggable>
    )
}

export default NoteCard