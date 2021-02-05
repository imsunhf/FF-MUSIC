export const jumpHelper = (audio) => {
  const audioContext = new AudioContext()

  const analyser = audioContext.createAnalyser()
  const playData = audioContext.createMediaElementSource(audio)

  playData.connect(analyser)
  analyser.connect(audioContext.destination)
  return analyser
}