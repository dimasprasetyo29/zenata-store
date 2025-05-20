export function loadMemberView(rootElement) {
  const members = Array.from({ length: 20 }).map((_, i) => {
    const male = i % 2 === 0;
    return {
      name: male ? `John #${i + 1}` : `Jane #${i + 1}`,
      gender: male ? 'male' : 'female',
      avatar: `https://robohash.org/${encodeURIComponent(male ? 'john' + i : 'jane' + i)}.png?set=set5`
    };
  });

  rootElement.innerHTML = '';

  members.forEach((member, idx) => {
    const card = document.createElement("div");
    card.className = `
      bg-gray-800/50 backdrop-blur-md text-white p-4 rounded-xl shadow-md flex items-center space-x-4 mb-4
      transform opacity-0 translate-y-4 transition-all duration-700 delay-${idx * 50}
    `;

    card.innerHTML = `
      <img src="${member.avatar}" alt="${member.name}" class="w-16 h-16 rounded-full border-2 border-cyan-400" />
      <div>
        <div class="text-sm text-gray-400">${member.gender.charAt(0).toUpperCase() + member.gender.slice(1)}</div>
        <div class="text-lg font-bold text-cyan-300">${member.name}</div>
      </div>
    `;

    rootElement.appendChild(card);
    // Trigger animation
    requestAnimationFrame(() => {
      card.classList.remove("opacity-0", "translate-y-4");
    });
  });
}
