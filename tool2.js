import staticAnalysis from 'static-analysis'

(async () => {
  const res = await staticAnalysis('src', {
    shallow: true,
  })
  console.log(res)
})()