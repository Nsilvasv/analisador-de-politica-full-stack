import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";

import CreatePolitica from "../Pages/CreatePolitica";
import ViewPolitica from "../Pages/ViewPolitica";

const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/criar-politica" element={<CreatePolitica />} />
                <Route path="/politicas/:id" element={<ViewPolitica />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Rotas;