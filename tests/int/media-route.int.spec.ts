// @vitest-environment node
import { beforeEach, expect, it, vi } from 'vitest'

const mocks = vi.hoisted(() => ({ select: vi.fn(), send: vi.fn(), getS3: vi.fn() }))
vi.mock('@/db', () => ({ db: { select: mocks.select } }))
vi.mock('@/app/(dashboard)/dashboard/(main)/media/upload', () => ({ getS3: mocks.getS3 }))
import { GET } from '@/app/api/media/[id]/route'
const id = '12345678-1234-4234-8234-123456789abc'
const request = (value = id) => GET(new Request('http://localhost/api/media/' + value), { params: Promise.resolve({ id: value }) })

beforeEach(() => {
  vi.resetAllMocks()
  mocks.select.mockReturnValue({ from: () => ({ where: () => ({ limit: async () => [{ storagePath: 'image.png', mimeType: 'image/png' }] }) }) })
  mocks.getS3.mockReturnValue({ client: { send: mocks.send }, bucket: 'test' })
})

it('rejects malformed UUIDs before querying storage', async () => {
  expect((await request('-'.repeat(36))).status).toBe(400)
  expect(mocks.select).not.toHaveBeenCalled()
})

it('streams original bytes and preserves content headers without buffering', async () => {
  const bytes = new Uint8Array([0, 128, 255])
  mocks.send.mockResolvedValue({ ContentLength: 3, Body: { transformToWebStream: () => new ReadableStream({ start(c) { c.enqueue(bytes); c.close() } }) } })
  const response = await request()
  expect(response.status).toBe(200)
  expect(response.headers.get('content-type')).toBe('image/png')
  expect(response.headers.get('content-length')).toBe('3')
  expect(response.headers.get('cache-control')).toContain('immutable')
  expect(new Uint8Array(await response.arrayBuffer())).toEqual(bytes)
})

it('returns 404 for missing object body', async () => {
  mocks.send.mockResolvedValue({})
  expect((await request()).status).toBe(404)
})

it('returns 404 when the media row does not exist', async () => {
  mocks.select.mockReturnValue({ from: () => ({ where: () => ({ limit: async () => [] }) }) })
  expect((await request()).status).toBe(404)
})

it('returns controlled error for storage setup failure', async () => {
  mocks.getS3.mockImplementation(() => { throw new Error('not configured') })
  const log = vi.spyOn(console, 'error').mockImplementation(() => {})
  try { expect((await request()).status).toBe(500) } finally { log.mockRestore() }
})

it('returns controlled error for database failure', async () => {
  mocks.select.mockImplementation(() => { throw new Error('offline') })
  const log = vi.spyOn(console, 'error').mockImplementation(() => {})
  try { expect((await request()).status).toBe(500) } finally { log.mockRestore() }
})

it('propagates mid-stream failure instead of returning truncated successful bytes', async () => {
  mocks.send.mockResolvedValue({ Body: { transformToWebStream: () => new ReadableStream({ start(c) { c.error(new Error('stream failed')) } }) } })
  const response = await request()
  await expect(response.arrayBuffer()).rejects.toThrow('stream failed')
})
