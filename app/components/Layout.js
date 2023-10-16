
import Header from '../components/Header.js'
import Footer from '../components/Footer.js'


export default function Layout({children}){
  return (
    <div className="w-full mx-auto p-4 bg-gray-200"
    >
      <Header />
      <main className="w-full mx-auto p-4 bg-gray-200"
>
        {children}
      </main>
      <Footer />
    </div>
  )
}
