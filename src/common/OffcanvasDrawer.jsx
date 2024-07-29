import { Offcanvas } from "react-bootstrap";

import CanvasHeader from "./CanvasHeader";

const OffcanvasDrawer = ({ isDrawerOpen, setDrawerOpen, children, title }) => {
  return (
    <Offcanvas
      show={isDrawerOpen}
      onHide={setDrawerOpen}
      placement={"end"}
      className="offcanvas-addNewTable"
    >
      <Offcanvas.Header>
        <Offcanvas.Title className="w-100">
          <CanvasHeader setDrawerOpen={setDrawerOpen} title={title} />
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>{children}</Offcanvas.Body>
    </Offcanvas>
  );
};

export default OffcanvasDrawer;
