import { useState } from 'react'
import Nominee from '../Nominee'
import styles from './Category.module.scss'
import { SelectedNomineesType } from '@/pages/index'

interface Props extends CategoryType {
  onSelect: (categoryId: string, nomineeId: string) => void;
  selectedNominees: SelectedNomineesType;
}

const Category = ({ id, items, title, selectedNominees, onSelect }: Props) => (
  <div className={styles.category}>
    <h4>{title}</h4>
    <div className={styles.nominees}>
      {items.map(item => (
        <Nominee
          key={item.id}
          {...item}
          isSelected={Boolean(selectedNominees[id]?.[item.id])}
          onSelect={(nomineeId) => onSelect(id, nomineeId)}
        />
      ))}
    </div>
  </div>
)

export default Category
