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
      userId: 1,
      title: 'Great Writing',
      status: 'active'
    }),
    Submission.create({
      content:
        'This is writing of fairly high quality This is writing of fairly high quality This is writing of fairly high quality This is writing of fairly high quality This is writing of fairly high quality This is writing of fairly high quality This is writing of fairly high quality This is writing of fairly high quality This is writing of fairly high quality This is writing of fairly high quality This is writing of fairly high quality This is writing of fairly high quality This is writing of fairly high quality This is writing of fairly high quality This is writing of fairly high quality This is writing of fairly high quality',
      userId: 2,
      title: 'Decent Writing',
      status: 'active'
    }),
    Submission.create({
      content:
        'This is writing of average quality This is writing of average quality This is writing of average quality This is writing of average quality This is writing of average quality This is writing of average quality This is writing of average quality This is writing of average quality This is writing of average quality This is writing of average quality This is writing of average quality This is writing of average quality This is writing of average quality This is writing of average quality This is writing of average quality This is writing of average quality This is writing of average quality This is writing of average quality',
      userId: 3,
      title: 'Average Writing',
      status: 'active'
    }),
    Submission.create({
      content:
        "This is writing of low quality This is writing of low quality  This is writing of low quality  This is writing of low quality  This is writing of low quality  This is writing of low quality  This is writing of low quality  This is writing of low quality  This is writing of low quality  This is writing of low quality This is writing of low quality This is writing of low quality This is writing of low quality This is writing of low quality This is writing of low quality This is writing of low quality This is writing of low quality This is writing of low quality This is writing of low quality This is writing of low quality This is writing of low quality This is writing of low quality This is writing of low quality This is writing of low quality This is writing of low quality This is writing of low quality This is writing of low quality ***And it's needlessly long too****",
      userId: 4,
      title: 'Bad Writing',
      status: 'active'
    }),
    Submission.create({
      content:
        'This is writing of unimaginably dreadful quality, This is writing of unimaginably dreadful quality, This is writing of unimaginably dreadful quality, This is writing of unimaginably dreadful quality This is writing of unimaginably dreadful quality This is writing of unimaginably dreadful quality This is writing of unimaginably dreadful quality This is writing of unimaginably dreadful quality This is writing of unimaginably dreadful quality This is writing of unimaginably dreadful quality This is writing of unimaginably dreadful quality This is writing of unimaginably dreadful quality This is writing of unimaginably dreadful quality This is writing of unimaginably dreadful quality This is writing of unimaginably dreadful quality This is writing of unimaginably dreadful quality This is writing of unimaginably dreadful quality',
      userId: 5,
      title: 'Awful Writing',
      status: 'active'
    }),
    Submission.create({
      content:
        'Life seems to be common even to plants, but we are seeking what is peculiar to man. Let us exclude, therefore, the life of nutrition and growth. Next there would be a life of perception, but it also seems to be common even to the horse, the ox, and every animal. There remains, then, an active life of the element that has a rational principle; of this, one part has such a principle in the sense of being obedient to one, the other in the sense of possessing one and exercising thought. And, as "life of the rational element" also has two meanings, we must state that life in the sense of activity is what we mean; for this seems to be the more proper sense of the term.',
      title: 'Life',
      status: 'featured'
    }),
    Submission.create({
      content:
        "Since those who rule in the city do so because they own a lot, I suppose they're unwilling to enact laws to prevent young people who've had no discipline from spending and wasting their wealth, so that by making loans to them, secured by the young people's property, and then calling those loans in, they themselves become even richer and more honored.",
      title: 'Advice',
      status: 'featured'
    }),
    Submission.create({
      content: 'All entities move and nothing remains still.',
      title: 'Fragment',
      status: 'featured'
    }),
    Submission.create({
      content:
        'We ought to regard the interests of the state as of far greater moment than all else, in order that they may be administered well; and we ought not to engage in eager rivalry in despite of equity, nor arrogate to ourselves any power contrary to the common welfare. For a state well administered is our greatest safeguard. In this all is summed up: When the state is in a healthy condition all things prosper; when it is corrupt, all things go to ruin.',
      title: 'The State',
      status: 'featured'
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
