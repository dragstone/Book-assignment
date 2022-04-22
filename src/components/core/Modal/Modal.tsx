import Card from '../Card/Card'

import Cancel from '../../../assets/cancel.svg'
import './Modal.scss'

type ModalProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  children: React.ReactNode
  title: string
}

export default function Modal(props: ModalProps) {
  const { setOpen, children, title } = props
  return (
    <>
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className="backdrop"
      ></div>
      <Card cssClass="modal">
        <header className="header">
          <h2>{title}</h2>
          <img
            src={Cancel}
            width={'30px'}
            onClick={() => setOpen(false)}
            alt="cancel icon"
            aria-hidden
          />
        </header>
        <div className="content">{children}</div>
      </Card>
    </>
  )
}
