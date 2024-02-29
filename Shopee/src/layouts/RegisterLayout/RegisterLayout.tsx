import Footer from 'src/components/RegisterHeader/Footer'

interface Props {
  children?: React.ReactNode
}
export default function RegisterLayout({ children }: Props) {
  return (
    <div>
      <RegisterLayout />
      {children}
      <Footer />
    </div>
  )
}
