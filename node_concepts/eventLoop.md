# Understanding the Node.js Event Loop

## Overview

The Event Loop is the core mechanism that allows Node.js to perform non-blocking I/O operations despite JavaScript being single-threaded. It handles the execution of multiple chunks of your program over time, each chunk running at the appropriate time.

## Event Loop Phases

```
┌────────────────────────────┐
│   1. timers                │  ← setTimeout / setInterval callbacks
│   2. pending callbacks     │  ← system / OS-level errors, e.g. TCP errors
│   3. idle, prepare         │  ← internal libuv setup
│   4. poll                  │  ← I/O events (fs, sockets, DNS, crypto, etc.)
│   5. check                 │  ← setImmediate callbacks
│   6. close callbacks       │  ← cleanup after sockets/streams close
└────────────────────────────┘
```

## Task Types

### 1. Microtasks

- `process.nextTick()` callbacks (highest priority)
- Promise callbacks (`.then()`, `.catch()`, `.finally()`)
- Higher priority than macrotasks
- Run between phases of the event loop

### 2. Macrotasks

- `setTimeout()` / `setInterval()` callbacks
- `setImmediate()` callbacks
- I/O operations (fs, crypto)
- Run during specific phases of the event loop

## Detailed Phase Explanation

### 1. Timers Phase

- Executes callbacks scheduled by `setTimeout()` and `setInterval()`
- Timing is not guaranteed, only minimum time to execution

### 2. Pending Callbacks Phase

- Executes system-level callbacks
- Example: TCP errors, OS-level events

### 3. Idle, Prepare Phase

- Internal Node.js operations
- Not typically relevant for application code

### 4. Poll Phase 🔍

#### Purpose

- Heart of the event loop
- Processes I/O events
- Executes I/O related callbacks

#### Behavior

```javascript
fs.readFile("file.txt", "utf8", () => {
  console.log("Poll phase: fs.readFile done!");
});
```

#### Key Points

- Executes I/O callbacks from libuv thread pool
- Waits for new events if queue is empty
- Moves to check phase if setImmediate is pending
- Moves to timers phase if timers are ready

### 5. Check Phase ✅

#### Purpose

- Dedicated phase for `setImmediate()` callbacks
- Runs immediately after poll phase

#### Example

```javascript
setImmediate(() => console.log("Check phase: setImmediate runs"));
```

#### Important Notes

- Inside I/O callbacks: `setImmediate` runs before `setTimeout`
- Outside I/O context: `setTimeout` typically runs first

### 6. Close Callbacks Phase

#### Purpose

- Handles cleanup of closed resources
- Executes 'close' event handlers

#### Example

```javascript
const net = require("node:net");
const server = net.createServer((socket) => {
  socket.on("close", () => {
    console.log("Close phase: socket closed!");
  });
  socket.destroy(); // triggers close
});
```

## Important Behaviors and Patterns

### Execution Order Priority

1. Synchronous code
2. Microtasks
   - `process.nextTick()`
   - Promise callbacks
3. Macrotasks
   - Timer callbacks
   - I/O operations
   - `setImmediate`

### I/O Operations

```javascript
fs.readFile("file.txt", () => {
  // This runs in the poll phase
  setImmediate(() => {
    // This runs in the next check phase
  });
  setTimeout(() => {
    // This runs in the next timers phase
  }, 0);
});
```

### Thread Pool Operations

- File system operations (`fs`)
- Cryptographic operations (`crypto`)
- Both use libuv's thread pool
- Callbacks scheduled in poll phase when complete

## Best Practices

1. **Use `setImmediate()` over `setTimeout(fn, 0)`**

   - More efficient for I/O callbacks
   - Guaranteed execution order in I/O context

2. **Handle Microtasks Carefully**

   - `process.nextTick()` can starve the event loop
   - Use Promise chaining for better flow control

3. **Monitor I/O Operations**
   - Be aware of thread pool usage
   - Consider concurrent operation limits

## Event Loop Flow Summary

```
┌──────────────┐
│  Timers      │ → setTimeout, setInterval
├──────────────┤
│  Pending     │ → system-level callbacks
├──────────────┤
│  Idle,Prep   │ → internal work
├──────────────┤
│  Poll        │ → run I/O callbacks (fs, net, crypto)
│     ↓        │
│  (waits for new I/O)
├──────────────┤
│  Check       │ → run setImmediate()
├──────────────┤
│  Close       │ → run 'close' event handlers
└──────────────┘
```

**Remember**: Between each phase:

- `process.nextTick()` queue is processed
- Promise microtask queue is processed

This ensures high-priority callbacks are handled promptly and maintains the expected execution order of your application.
