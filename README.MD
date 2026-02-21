# CP Booster

A minimal competitive programming workflow tool built around CPH, Vim, and a custom local judge.

The goal is simple:

Parse fast.  
Code fast.  
Test fast.  
Stay inside the terminal.

---

## Features

- Contest mode parsing (A.cpp, B.cpp, C.cpp…)
- Single problem parsing
- Custom C++ template injection
- Local judge (`run` command)
- Colored AC / WA output
- Full input/output display on WA
- Debug mode (`-d`)
- Vim-friendly workflow

---

## Installation

### 1. Clone

```bash
git clone https://github.com/Adarshrai24/CP-Booster
cd cp-booster
```

### 2. Install server dependencies

```bash
cd server
npm install
```

### 3. Add run to PATH

Add this to your `~/.bashrc`:

export PATH="$HOME/cp-booster/scripts:$PATH"

Reload shell:

```bash
source ~/.bashrc
```

### 4. Configure CPH

Set custom parser URL to:

http://localhost:1321/

---

## Usage

### Single Problem

```bash
cp init
```

Parses problem into current directory:

Problem_Name.cpp  
Problem_Name_in1.txt  
Problem_Name_out1.txt  

### Contest Mode

```bash
cp init ContestName
```

Creates:

ContestName/  
  A.cpp  
  A_in1.txt  
  A_out1.txt  
  B.cpp  
  ...  

---

### Running Solutions

```bash
run A
```

Compiles `A.cpp`, runs all test cases.

Output:

✅ Accepted 

or

❌ Wrong Answer  

On WA, it prints:

- Input
- Your output
- Expected output

---

### Debug Mode

```bash
run A -d
```

Runs program with manual input (no comparison).

---

## Custom Template

Edit:

templates/template.cpp

All parsed files use this template.
