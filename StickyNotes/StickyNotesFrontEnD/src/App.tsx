import NotesPage from "./pages/NotesPage"
import NotesProvider from "./context/NotesProvider"
import { isMobile, MobileView } from "react-device-detect"

function App() {
  return (
    isMobile ? <MobileView style={{
      margin: 10,
      textAlign: "center",
    }}>
      <h2>Not Compatible with mobile screens..</h2>
    </MobileView> :
      <div id="app" >
        <NotesProvider>
          <NotesPage />
        </NotesProvider>
      </div>
  )
}

export default App;
