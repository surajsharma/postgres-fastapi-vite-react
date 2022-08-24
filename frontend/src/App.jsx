import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import isEqual from "lodash/isEqual";
import ReactModal from "react-modal";

import "./App.css";
import "./spin.css";

function LoadingSpinner() {
    return (
        <div className="spinner-container">
            <div className="loading-spinner"></div>
        </div>
    );
}

function App() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [apploading, setApploading] = useState(true);

    const [lastUpdated, setLastUpdated] = useState(
        new Date().toLocaleTimeString()
    );

    const [modalCat, setModalCat] = useState(-1);

    let timer;

    useEffect(() => {
        const init = async () => {
            const i = await getItems();

            if (i.length) {
                const newItems = await getImages(i);
                setItems(newItems);
            } else {
                const seeded = await seedIfEmpty();
                const newItems = await getImages(seeded);
                setItems(newItems);
            }
        };

        init();
    }, []);

    useEffect(() => {
        setLoading(true);
        clearInterval(timer);

        if (items.length) {
            timer = setInterval(() => {
                poll();
            }, 10000);
        }
        if (items.length) {
            setLoading(false);
        }
    }, [items]);

    const getItems = async () => {
        setApploading(true);
        const response = await fetch("/api/items");
        const i = await response.json();
        setApploading(false);
        return i;
    };

    const seedIfEmpty = async () => {
        const empty = await getItems();
        let seeded = [];
        if (!empty.length) {
            console.log("seed");
            const response = await fetch("/api/seed");
            seeded = await response.json(response);
        }
        return seeded;
    };

    const getImages = async (is) => {
        let cards = await Promise.all(
            is.map(async (i) => {
                setLoading(true);
                const resp = await fetch("https://aws.random.cat/meow");
                const image = await resp.json(resp);
                i.img = image.file;
                return i;
            })
        );
        if (cards.length) {
            return cards;
        }
    };

    const poll = async () => {
        if (!items.length) return;

        console.log("polling db for changes...", items);
        const response = await fetch("/api/items");

        let newItems = await response.json();

        let oldItems = items.map((i, ind) => {
            delete i.img;
            return i;
        });

        newItems = newItems.map((i, ind) => {
            delete i.img;
            return i;
        });

        if (!arraysEqual(oldItems, newItems)) {
            console.log("items will reset", oldItems, newItems);
            const withImages = await getImages(newItems);
            setItems(withImages);
            setLastUpdated(new Date().toLocaleTimeString());
            clearInterval(timer);
        }
    };

    const onDragEnd = (result) => {
        const newItems = items;
        const [removed] = newItems.splice(result.source.index, 1);
        newItems.splice(result.destination.index, 0, removed);
        setItems(newItems);
    };

    const arraysEqual = (a, b) => {
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length !== b.length) return false;
        for (var i = 0; i < a.length; ++i) {
            if (!isEqual(a[i], b[i])) return false;
        }
        return true;
    };

    if (apploading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="App parent">
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId={"drop"} direction="horizontal">
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="parent"
                        >
                            {items &&
                                items.map((item, index) => (
                                    <Draggable
                                        key={item.position}
                                        draggableId={item.position.toString()}
                                        index={index}
                                    >
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className={`div${
                                                    index + 1
                                                } card`}
                                            >
                                                {item.title}
                                                {!item.img || loading ? (
                                                    <LoadingSpinner />
                                                ) : (
                                                    <img
                                                        src={item.img}
                                                        alt=""
                                                        height={"200px"}
                                                        width={"220px"}
                                                        onClick={() =>
                                                            setModalCat(index)
                                                        }
                                                    />
                                                )}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                            {provided.placeholder}
                            <p>Last Updated: {lastUpdated}</p>
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <div onClick={() => setModalCat(-1)}>
                <ReactModal
                    ariaHideApp={false}
                    isOpen={modalCat > -1}
                    contentLabel="cat picture"
                    style={{
                        overlay: {
                            position: "fixed",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: "rgba(0, 0, 0, 0.75)"
                        },
                        content: {
                            position: "absolute",
                            backgroundColor: "rgba(0, 0, 0, 0.75)",
                            overflow: "auto",
                            WebkitOverflowScrolling: "touch",
                            outline: "none",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignContent: "center",
                            alignItems: "center",
                            color: "red"
                        }
                    }}
                >
                    {modalCat > -1 && !loading && items[modalCat].img && (
                        <>
                            <img
                                src={items[modalCat].img}
                                alt=""
                                height="500px"
                            />
                            <p>To hide, click anywhere on the modal.</p>
                        </>
                    )}
                </ReactModal>
            </div>
        </div>
    );
}

export default App;
