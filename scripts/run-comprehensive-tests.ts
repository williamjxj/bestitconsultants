#!/usr/bin/env ts-node
// scripts/run-comprehensive-tests.ts
import { spawn } from 'child_process'

interface TestSuite {
  name: string
  command: string
  args: string[]
}

const testSuites: TestSuite[] = [
  {
    name: 'Unit Tests',
    command: 'npm',
    args: ['test', '--', 'tests/unit'],
  },
  {
    name: 'Integration Tests',
    command: 'npm',
    args: ['test', '--', 'tests/integration'],
  },
  {
    name: 'E2E Tests',
    command: 'npm',
    args: ['test', '--', 'tests/e2e'],
  },
  {
    name: 'Performance Tests',
    command: 'npm',
    args: ['test', '--', 'tests/performance'],
  },
  {
    name: 'Contract Tests',
    command: 'npm',
    args: ['test', '--', 'tests/contract'],
  },
]

async function runTestSuite(suite: TestSuite): Promise<boolean> {
  return new Promise(resolve => {
    console.log(`\n🧪 Running ${suite.name}...`)
    const proc = spawn(suite.command, suite.args, {
      stdio: 'inherit',
      shell: true,
    })

    proc.on('close', code => {
      if (code === 0) {
        console.log(`✅ ${suite.name} passed`)
        resolve(true)
      } else {
        console.error(`❌ ${suite.name} failed`)
        resolve(false)
      }
    })
  })
}

async function runAllTests() {
  console.log('🚀 Starting comprehensive test suite...\n')
  const startTime = Date.now()
  const results: boolean[] = []

  for (const suite of testSuites) {
    const passed = await runTestSuite(suite)
    results.push(passed)
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(2)
  const passCount = results.filter(r => r).length
  const totalCount = results.length

  console.log('\n' + '='.repeat(50))
  console.log(`📊 Test Summary:`)
  console.log(`   - Total Suites: ${totalCount}`)
  console.log(`   - Passed: ${passCount}`)
  console.log(`   - Failed: ${totalCount - passCount}`)
  console.log(`   - Duration: ${duration}s`)
  console.log('='.repeat(50))

  if (passCount === totalCount) {
    console.log('\n✅ All tests passed!')
    process.exit(0)
  } else {
    console.error('\n❌ Some tests failed.')
    process.exit(1)
  }
}

runAllTests().catch(error => {
  console.error('Error running tests:', error)
  process.exit(1)
})
