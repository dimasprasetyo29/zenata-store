export function loadStatsView(container) {
  container.innerHTML = `
    <section class="p-6 space-y-6">
      <div class="bg-gray-900 p-6 rounded-xl shadow-md">
        <h2 class="text-xl font-bold text-cyan-300 mb-4">Monthly Sales Table</h2>
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-800 text-cyan-200">
              <th class="p-2">Month</th>
              <th class="p-2">Orders</th>
              <th class="p-2">Revenue</th>
              <th class="p-2">Change</th>
            </tr>
          </thead>
          <tbody>
            ${getSalesData().map(item => `
              <tr class="border-t border-gray-700 hover:bg-gray-800">
                <td class="p-2">${item.month}</td>
                <td class="p-2">${item.orders}</td>
                <td class="p-2">$${item.revenue.toLocaleString()}</td>
                <td class="p-2 ${item.change >= 0 ? 'text-green-400' : 'text-red-400'}">
                  ${item.change >= 0 ? '▲' : '▼'} ${Math.abs(item.change)}%
                </td>
              </tr>`).join("")}
          </tbody>
        </table>
      </div>

      <div class="bg-gray-900 p-6 rounded-xl shadow-md">
        <h2 class="text-xl font-bold text-cyan-300 mb-4">Revenue Chart</h2>
        <canvas id="statsChart" height="100"></canvas>
      </div>
    </section>
  `;

  
  const ctx = document.getElementById('statsChart').getContext('2d');
  const data = getSalesData();
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.map(d => d.month),
      datasets: [{
        label: 'Revenue',
        data: data.map(d => d.revenue),
        fill: true,
        backgroundColor: 'rgba(0, 255, 255, 0.1)',
        borderColor: 'rgba(0, 255, 255, 1)',
        tension: 0.4,
        pointBackgroundColor: 'rgba(0, 255, 255, 1)',
        pointRadius: 5,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { labels: { color: 'white' } }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { color: 'white', callback: val => `$${val}` },
          grid: { color: 'rgba(255,255,255,0.1)' }
        },
        x: {
          ticks: { color: 'white' },
          grid: { color: 'rgba(255,255,255,0.05)' }
        }
      }
    }
  });
}

function getSalesData() {
  return [
    { month: 'November', orders: 320, revenue: 12000, change: 5 },
    { month: 'December', orders: 400, revenue: 15000, change: 25 },
    { month: 'January', orders: 300, revenue: 11000, change: -26 },
    { month: 'February', orders: 450, revenue: 17000, change: 54 },
    { month: 'March', orders: 500, revenue: 19000, change: 12 },
    { month: 'April', orders: 600, revenue: 22000, change: 15 },
  ];
}
