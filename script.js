document.addEventListener('DOMContentLoaded', () => {

    // ---- Observer para textos e seções (exceto #momentos) ----
    const defaultObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0 });

    // Observa tudo que tem fade-slide-up, exceto a div #momentos e seus filhos
    document.querySelectorAll('.fade-slide-up').forEach(el => {
        defaultObserver.observe(el);
    });

    // ---- Observer para imagens fora de #momentos ----
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0 });

    document.querySelectorAll('.fade-slide-up img, .fade-slide-up video').forEach(el => {
        imageObserver.observe(el);
    });

    const form = document.getElementById('messageForm');
    const mensagensLista = document.getElementById('mensagens-lista');

    // Carregar mensagens salvas localmente
    const mensagensSalvas = JSON.parse(localStorage.getItem("mensagensNaomi")) || [];
    mensagensSalvas.forEach((msg, index) => criarMensagem(msg.nome, msg.texto, index));

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const nome = document.getElementById('nome').value.trim();
        const mensagem = document.getElementById('mensagem').value.trim();

        if (nome && mensagem) {
            const index = mensagensSalvas.length; // Novo índice
            criarMensagem(nome, mensagem, index);
            mensagensSalvas.push({ nome, texto: mensagem });
            localStorage.setItem("mensagensNaomi", JSON.stringify(mensagensSalvas));
            form.reset();
        }
    });

    
});