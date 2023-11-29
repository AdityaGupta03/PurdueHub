import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Class from './components/Class';

import './Club.css';

function ClassPage() {
    const { className } = useParams();

    // fetch class data here using whatever variable ^ in this case I passed classname so search for the classses array that contains that class name

    // sample data to show what may be passed 
    const sampleClass = {
        className: className,
        tag: ' - Computer Architecture',
        description: ' Digital logic: transistors, gates, and combinatorial circuits; clocks; registers and register banks; arithmetic-logic units; data representation: big-endian and little-endian integers; ones and twos complement arithmetic; signed and unsigned values; Von-Neumann architecture and bottleneck; instruction sets; RISC and CISC designs; instruction pipelines and stalls; rearranging code; memory and address spaces; physical and virtual memory; interleaving; page tables; memory caches; bus architecture; polling and interrupts; DMA; device programming; assembly language; optimizations; parallelism; data pipelining. Typically offered Fall Spring.',
        instructor: 'Professor X',
        creditHours: 4,
        prereq: ["CS: X", "CS: Y", "CS: Z"]
    };

    return (
        <Class data={sampleClass} />
    )
}

export default ClassPage