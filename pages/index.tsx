import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Category from '@/components/Category'
import Dialog from '@/components/Dialog'
import styles from '@/styles/Home.module.scss'

export interface SelectedNomineesType {
  [key: string]: undefined | { [key: string]: undefined | boolean }
}

const Home: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedNominees, setSelectedNominees] = useState<SelectedNomineesType>({})
  const [categories, setCategories] = useState<CategoryType[]>([])
  const [showDialog, setShowDialog] = useState(false)

  useEffect(() => {
    (async () => {
      setIsLoading(true)
      try {
        const data = await fetch('/api/ballots')
        const result = await data.json()
        setCategories(result.items)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [])

  const handleSelectCategories = (categoryId: string, nomineeId: string) => {
    setSelectedNominees(prev => ({
      ...prev,
      [categoryId]: {
        [nomineeId]: !prev[categoryId]?.[nomineeId]
      }
    }))
  }

  const handleSubmit = () => {
    setShowDialog(true)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Take Home Test</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link href="http://fonts.cdnfonts.com/css/roboto" rel="stylesheet" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          AWARDS 2021
        </h1>
        <div>
          {isLoading ? <>Loading...</> : categories.map((item: CategoryType) => (
            <Category
              key={item.id}
              {...item}
              selectedNominees={selectedNominees}
              onSelect={handleSelectCategories}
            />
          ))}
        </div>
      </main>
      <button className={styles.submit} onClick={handleSubmit}>Submit Ballot</button>
      <Dialog
        onClose={() => setShowDialog(false)}
        visible={showDialog}
        maskClosable={false}
      >
        <h3 className={styles.success}>Success</h3>
      </Dialog>
    </div>
  )
}

export default Home
