import Image from 'next/image'
import classNames from 'classnames'
import styles from './Nominee.module.scss'

interface Props extends NomineeType {
  isSelected: boolean;
  onSelect: (nomineeId: string) => void;
}

const Nominee = ({ id, photoUrL, title, isSelected, onSelect }: Props) => (
  <div
    className={classNames(styles.nominee, { [styles.selected]: isSelected })}
    onClick={() => onSelect(id)}
  >
    <h4>{title}</h4>
    <Image
      className={styles.photo}
      src={photoUrL}
      alt="Nominee image"
      width="200"
      height="200"
      objectFit="cover"
    />
    <button
      onClick={(e) => {
        e.stopPropagation()
        onSelect(id)
      }}
    >
      {isSelected ? 'Deselect' : 'Select'}
    </button>
  </div>
)

export default Nominee
