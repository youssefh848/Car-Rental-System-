import express from 'express'
import customerRouter from './src/modules/customer/customer.routes.js'
import carRouter from './src/modules/car/car.routes.js'
import rentalRouter from './src/modules/rental/rental.routes.js'
import specialRouter from './src/modules/special/special.routes.js'

const app = express()
const port = process.env.port || 3000
app.use(express.json())


app.use('/customers',customerRouter)
app.use('/cars',carRouter)
app.use('/rental',rentalRouter)
app.use('/special',specialRouter)





app.listen(port, () => console.log(`app listening on port ${port}!`))