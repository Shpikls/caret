import React, { useRef, useState } from "react";
import {buildPathToWrapper, findNodeFromPath} from "./buildPathToWrapper";

function App() {
    const innerHtml = '<p>Text <i>italic</i> <b><i>bold and italic</i></b></p>'
    const editable1Ref = useRef<HTMLDivElement>(null);
    const editable2Ref = useRef<HTMLDivElement>(null);
    const [savedRange, setSavedRange] = useState<Range>();
    const [path, setPath] = useState<number[]>();

    const handleShowSavedRange = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log(savedRange);
    }

    const handleSelect = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
    }

    const handleSaveRange = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const sel = document.getSelection();
        const currRange = sel?.getRangeAt(0);
        const clonedRange= currRange?.cloneRange();
        setSavedRange(clonedRange);

        console.log(clonedRange);
    }

    const handleBuildPath = () => {
        const wrapper = document.getElementById('editable1')

        if (savedRange?.startContainer && wrapper) {
            const path = buildPathToWrapper(savedRange.startContainer, wrapper);

            console.log(path);
            setPath(path)
        }
    };

    const handleFindNode = () => {
        const wrapper = document.getElementById('editable2')

        if (path && wrapper) {
            try {
                const node = findNodeFromPath(path, wrapper);

                console.log(node);
            } catch (e) {
                if (e instanceof Error) {
                    console.log(e.message);
                }
            }
        }

    }

    return (
        <>
            <div
                id="editable1"
                ref={editable1Ref}
                contentEditable
                dangerouslySetInnerHTML={{__html: innerHtml}}
            />
            <div
                id="editable2"
                ref={editable2Ref}
                contentEditable
                dangerouslySetInnerHTML={{__html: innerHtml}}
            />
            <button onClick={handleShowSavedRange}>show saved range</button>
            <button onClick={handleSaveRange}>save range</button>
            <button onClick={handleSelect}>select</button>
            <button onClick={handleBuildPath}>build path</button>
            <button onClick={handleFindNode}>find node from copy element</button>
        </>
    )
}

export default App
