import partialLoader from '../src'

describe('Mustachjs partial loader function', () => {
  it('finds the file from path options', async () => {
    const data = partialLoader.call(
      {
        query: {
          path: './test/partials',
        },
      },
      ['template'],
      'source'
    )
    const result = {
      template: ['template'],
      partials: {
        './test/partials/template.mustache': `<h1>Hi, {{name}}</h1>
`,
      },
    }

    expect(result).toMatchObject(data)
  })

  it('finds the file from path options and recurses', async () => {
    const data = partialLoader.call(
      {
        query: {
          path: './test/partials',
          recurse: true,
        },
      },
      ['template'],
      'source'
    )
    const result = {
      template: ['template'],
      partials: {
        './test/partials/sub/sub.mustache': `subtemplate
`,
        './test/partials/template.mustache': `<h1>Hi, {{name}}</h1>
`,
      },
    }

    expect(result).toMatchObject(data)
  })

  it('changes the template key based on options', async () => {
    const data = partialLoader.call(
      {
        query: {
          path: './test/partials',
          modifyTemplateKey: [
            [/^\.\/test\//, ''],
            [/\.mustache$/, ''],
          ],
        },
      },
      ['template'],
      'source'
    )

    expect(data.partials['partials/template']).toBeDefined()
  })

  it('finds files with suffix defined in options', async () => {
    const data = partialLoader.call(
      {
        query: {
          path: './test/partials',
          suffix: '.html',
        },
      },
      ['template'],
      'source'
    )

    expect(data.partials['./test/partials/index.html']).toBeDefined()
    expect(data.partials['./test/partials/index.html']).toEqual(`html
`)
    expect(Object.keys(data.partials).length).toBe(1)
  })
})
