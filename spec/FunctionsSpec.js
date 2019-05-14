describe('Functions', () => {
  describe('#toMinutes', () => {
    it('converts seconds to minutes', () => {
      expect(toMinutes(60)).toEqual(1)
    })

    it('rounds 59s down to 0min', () => {
      expect(toMinutes(59)).toEqual(0)
    })

    it('rounds 119s down to 1min', () => {
      expect(toMinutes(119)).toEqual(1)
    })
  })
})
