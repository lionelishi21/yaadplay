import './globals.css'

export const metadata = {
  title: 'YaadPlay - Jamaica\'s Gaming Destination',
  description: 'Jamaica\'s #1 Gaming & Gift Card E-Commerce Store',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}



