import { Note } from "../types/@types.note";

const fakeData: Note[] = [
    {
        unid: "random-uuid1",
        title: "test-content-1",
        content: "Sample Data for body content.",
        colors: {
            id: "color-purple",
            colorHeader: "#FED0FD",
            colorBody: "#FEE5FD",
            colorText: "#18181A",
        },
        position: { x: 800, y: 500 },
    },
    {
        unid: "random-uuid2",
        title: "test-content-2",
        content: "Sample Data for body content.",
        colors: {
            id: "color-green",
            colorHeader: "#AFDA9F",
            colorBody: "#BCDEAF",
            colorText: "#18181A"
        },
        position: { x: 53, y: 100 },
    }
];

export default fakeData;