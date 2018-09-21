'use strict'

const db = require('../server/db')
const {User, Submission, Rating} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'agonuser@invalid.com', password: 'password'}),
    User.create({email: 'anotheragonuser@invalid.com', password: 'password'}),
    User.create({email: 'apollo@invalid.com', password: 'password'}),
    User.create({email: 'dionysus@invalid.com', password: 'password'}),
    User.create({email: 'kevingislason@gmail.com', password: 'password'}),
    User.create({email: 'kgislason@uchicago.edu', password: 'password'})
  ])

  const submissions = await Promise.all([
    Submission.create({
      content:
        'This is writing of extremely high quality This is writing of extremely high qualityThis is writing of extremely high qualityThis is writing of extremely high qualityThis is writing of extremely high qualityThis is writing of extremely high qualityThis is writing of extremely high qualityThis is writing of extremely high qualityThis is writing of extremely high qualityThis is writing of extremely high qualityThis is writing of extremely high qualityThis is writing of extremely high qualityThis is writing of extremely high qualityThis is writing of extremely high quality',
      userId: 1
    }),
    Submission.create({
      content:
        'This is writing of fairly high quality This is writing of fairly high quality This is writing of fairly high quality This is writing of fairly high quality This is writing of fairly high quality This is writing of fairly high quality This is writing of fairly high quality This is writing of fairly high quality This is writing of fairly high quality This is writing of fairly high quality This is writing of fairly high quality This is writing of fairly high quality This is writing of fairly high quality This is writing of fairly high quality This is writing of fairly high quality This is writing of fairly high quality',
      userId: 2
    }),
    Submission.create({
      content:
        'This is writing of average quality This is writing of average quality This is writing of average quality This is writing of average quality This is writing of average quality This is writing of average quality This is writing of average quality This is writing of average quality This is writing of average quality This is writing of average quality This is writing of average quality This is writing of average quality This is writing of average quality This is writing of average quality This is writing of average quality This is writing of average quality This is writing of average quality This is writing of average quality',
      userId: 3
    }),
    Submission.create({
      content:
        "This is writing of low quality This is writing of low quality  This is writing of low quality  This is writing of low quality  This is writing of low quality  This is writing of low quality  This is writing of low quality  This is writing of low quality  This is writing of low quality  This is writing of low quality This is writing of low quality This is writing of low quality This is writing of low quality This is writing of low quality This is writing of low quality This is writing of low quality This is writing of low quality This is writing of low quality This is writing of low quality This is writing of low quality This is writing of low quality This is writing of low quality This is writing of low quality This is writing of low quality This is writing of low quality This is writing of low quality This is writing of low quality ***And it's needlessly long too****",
      userId: 4
    }),
    Submission.create({
      content:
        'This is writing of unimaginably dreadful quality, This is writing of unimaginably dreadful quality, This is writing of unimaginably dreadful quality, This is writing of unimaginably dreadful quality This is writing of unimaginably dreadful quality This is writing of unimaginably dreadful quality This is writing of unimaginably dreadful quality This is writing of unimaginably dreadful quality This is writing of unimaginably dreadful quality This is writing of unimaginably dreadful quality This is writing of unimaginably dreadful quality This is writing of unimaginably dreadful quality This is writing of unimaginably dreadful quality This is writing of unimaginably dreadful quality This is writing of unimaginably dreadful quality This is writing of unimaginably dreadful quality This is writing of unimaginably dreadful quality',
      userId: 5
    })
  ])

  const ratings = await Promise.all([
    Rating.create({score: null, reviewerId: 6, submissionId: 1}),
    Rating.create({score: null, reviewerId: 6, submissionId: 2}),
    Rating.create({score: null, reviewerId: 6, submissionId: 3}),
    Rating.create({score: null, reviewerId: 6, submissionId: 4}),
    Rating.create({score: null, reviewerId: 6, submissionId: 5})
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${submissions.length} submissions`)
  console.log(`seeded ${ratings.length} rtings`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
